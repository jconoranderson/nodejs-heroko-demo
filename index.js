/////
const FHIRURL = "https://r3.smarthealthit.org";

const client = FHIR.client(FHIRURL);
console.clear();

//// READING:
function handlePractitioners(data) {
	console.log("type of data:", typeof data);
	console.log("Reading items in data.entry:");
  for (var d in data.entry) {
		console.log("id:", data.entry[d].resource.id);
    console.log("family name:", data.entry[d].resource.name[0].family);
    console.log("first given name:", data.entry[d].resource.name[0].given[0]);
    console.log("-----------");
	}
}

//// We should wrap this all up into a function to show Practitioners by name. (We'll use it further below!)
function showPractionersByName(lastname) {
	client.request("Practitioner?name="+lastname).then(handlePractitioners).catch(console.error);	
}

//// CREATING / INSERTING:
function addPatient(Practitioner) {
  $.ajax({
  	//// POST is used to CREATE
    type: "POST",
    url: FHIRURL+'/Practitioner',
    headers: {
    },
    data: JSON.stringify(Practitioner),
    success: function (data) {
    	alert("Added Emmet Brown! If my calculations are correct, when this baby hits 88 miles per hour, you’re gonna see some serious s***.!");
		},
    error: function(er) {
      console.log(er);
    },
    datatype: 'json',
    contentType: 'application/json+fhir;charset=utf-8'
  });
}

function addEmmetBrown() {
  addPatient({
    "resourceType": "Practitioner",
    "name": {
      "given": ["Doc"],
      "family": "Brown"
    },
  });
}

//// UPDATING
function updatePatient(Practitioner) {
		$.ajax({
    	//// PUT is used to UPDATE
      type: "PUT",
      url: FHIRURL+'/Practitioner/'+Practitioner.id,
      success: function (Practitioner) {
	      alert("Updating the Practitioner. Changes should appear soon!")
      },
      data: JSON.stringify(Practitioner),
      datatype: 'json',
      contentType: 'application/json+fhir;charset=utf-8'
    });
}

function updateEmmetBrown() {
	updatePatient({
    //// Note what happens in the console if we leave out this id:
    "id": "288670",
		"resourceType": "Practitioner",
    "name": {
      "given": ["Emmet"],
      "family": "Brown"
    }
  });
}


function showBrowns() {
	console.clear();
	showPractionersByName("Brown");
}

//// DELETING
function deletePractioner(id) {
  $.ajax({
    type: "DELETE",
    url: FHIRURL+'/Practitioner/'+id,
    success: function (data) {
    	console.log("Practitioner", id, "deleted.")
      showPractionersByName("Brown");
    },
  });
}
//// Notice the resource.id is a String:
function deleteEmmet() {
	deletePractioner("288531");
}


function getValuesWithSameKey(keyName, data) {
  let values = [];

  if (typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      if (key === keyName) {
        values.push(value);
      } else {
        values = values.concat(getValuesWithSameKey(keyName, value));
      }
    }
  }
  return values;
}
