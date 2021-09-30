$(document).ready(function(){
    $("#btn-export").hide();
});

/***** GLOBAL VARIABLES *****/
  let processedRecords = [];

/***** Load and read CSV *****/
  function processCSV(input) {
    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      let rawData = $.csv.toArrays(reader.result);
      document.querySelector("#rawInput").innerHTML = $.csv.toArrays(
        reader.result
      );

      rawData.forEach((element) => {
        let processedRecord = {};
        processedRecord.name = element[4];          
        GetPhoneEmailFromRawData(processedRecord, element[11]);
        processedRecord.notes = element[11];
        processedRecords.push(processedRecord);
      });

      processedRecords.forEach((pr) => {
        if (pr.phone.length > 1 || pr.email.length > 1) {
          let name = document.createElement("div");
          name.classList.add("w250");
          name.innerHTML = pr.name;
          let email = document.createElement("div");
          email.classList.add("w300");
          email.innerHTML = pr.email;
          let phone = document.createElement("div");
          phone.classList.add("w200");
          phone.innerHTML = pr.phone;
          let notes = document.createElement("div");
          notes.classList.add("w300", "notes", "break");
          notes.innerHTML = pr.notes;
          let record = document.createElement("div");
          record.classList.add("record");
          record.append(name, email, phone, notes);
          document.querySelector("#filteredData").append(record);
        }
      });

      if(processedRecords.length > 0){
        $("#btn-export, #btn-refresh").show();        
      }

      $(".notes").dblclick(function(){
        $(this).toggleClass('notes-full');
      });
    };
  }


/******* Export CSV file ********/

function ExportCSV(){
    let csvExpData = $.csv.fromObjects(processedRecords);
    let blob = new Blob([csvExpData], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);

    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', 'export.csv');
    pom.click();
}

/****** REFRESH ******/
function Refresh(){
    location.reload();
}

/*******HELPER FUNCTIONS ********/

function GetPhoneEmailFromRawData(returnVal, rawobject) {
    returnVal.phone = returnVal.email = "";
    rawobject = rawobject.replaceAll(
        /\r?\n|\r|\/|\+|name|email|twitter|phone|mobile|\:/gi,
        " "
    );
    let objArr = rawobject.split(" ");
    returnVal.phone="";
    returnVal.email="";

    for(o of objArr){
        if (returnVal.phone.length > 1 && returnVal.email.length > 1) {
            break;
        }

        let filterO = o.replace(/\+\s|,|(|)/gi, "");
        if (returnVal.phone.length == 0 && parseInt(filterO) > 0 && ( /^\d{10}$/.test(filterO) || /^\d{12}$/.test(filterO))) {
            returnVal.phone = filterO.trim();
        }

        if (returnVal.email.length == 0 && validateEmail(filterO)) {
            returnVal.email = filterO.trim();
        }    
    }
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
