var isbn = require('node-isbn');
// var jquery = require('jquery');
// var filesaver = require('filesaverjs');
// var tableexport = require('tableexport');
//var tableToCsv = require('node-table-to-csv');

var i=1;


var myLink = document.getElementById('button');
// 9783140464079
myLink.onclick = function msg() {
    var isbnid = document.getElementById("myISBN").value;

    isbntotable(isbnid);
  }

  function isbntotable(isbnid) {
    isbn.provider(['google', 'openlibrary']).resolve(isbnid, function (err, book) {
    if (err) {
        console.log('Book not found', err);
        alert("Book not found!");
    } else {
        console.log('Book found', book);

        var table = document.getElementById("myTable");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(1);
        var cell4 = row.insertCell(1);
        var cell5 = row.insertCell(1);
        cell1.innerHTML = i;
        cell2.innerHTML = book.publishedDate;
        cell3.innerHTML = book.publisher;
        cell4.innerHTML = book.title;
        cell5.innerHTML = book.authors;

        i = i+1;
    }
});
}
var myCSV = document.getElementById('dlbutton');

myCSV.onclick = function tableToCSV() {
 
    // Variable to store the final csv data
    let csv_data = [];
 
    // Get each row data
    let rows = document.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
 
        // Get each column data
        let cols = rows[i].querySelectorAll('td,th');
 
        // Stores each csv row data
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
 
            // Get the text data of each cell of
            // a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }
 
        // Combine each column value with comma
        csv_data.push(csvrow.join(";"));
    }
    // Combine each row data with new line character
    csv_data = csv_data.join('\n');
    
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
 
    // Create CSV file object and feed our
    // csv_data into it
    CSVFile = new Blob([csv_data], { type: "text/csv" });
 
    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');
 
    // Download csv file
    temp_link.download = "isbn.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
 
    // Automatically click the link to trigger download 
    temp_link.click();
    document.body.removeChild(temp_link);
}

var myLink = document.getElementById('buttoncam');
// 9783140464079
myLink.onclick = function cameraon() {

    camera();
  }

function camera() {
    Dynamsoft.License.LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAyNjI3NzQwLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAyNjI3NzQwIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjo0MjMxODUyNjB9");
    (async () => {
        let router = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
    
        let view = await Dynamsoft.DCE.CameraView.createInstance();
        let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(view);
        document.querySelector("#cameraViewContainer").append(view.getUIElement());
        router.setInput(cameraEnhancer);
    
        // const resultsContainer = document.querySelector("#results");
        router.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
          if (result.barcodeResultItems.length > 0) {
            for (let item of result.barcodeResultItems) {
            //   resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
            isbntotable(item.text);
            }
          }
        }});
    
        let filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification(
          Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
        );
        filter.enableResultDeduplication(
          Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE, true
        );
        await router.addResultFilter(filter);
    
        await cameraEnhancer.open();
        await router.startCapturing("ReadSingleBarcode");
      })();
}