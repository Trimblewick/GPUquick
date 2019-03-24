



function AddMenuButtons()
{
  var header = document.getElementsByTagName("header")[0];
  //Name, Href
  var listOfButtons = [
    ["Graphics", "dx.html"],
    ["Machine Learning", "ml.html"]
    //["blog", "asdf

  ];

  for (var i = 0; i < listOfButtons.length; ++i)
  {
    var textNode = document.createTextNode(listOfButtons[i][0]);
    var menuButton = document.createElement('div');
    var hyperLink = document.createElement('a');

    //add link and text to button
    hyperLink.href = listOfButtons[i][1];
    hyperLink.appendChild(textNode);

    //set class
    menuButton.className = 'button-menu';
    menuButton.appendChild(hyperLink);

    //append
    header.appendChild(menuButton);
  }
}

function LoadFile(filePath)
{
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);

  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;

  }
  return result;
}

function AddCodeBlock(instructionBlockId, fileName)
{
  var instructionBlock = document.getElementById(instructionBlockId);

  var codeBlock = document.createElement('div');
  codeBlock.setAttribute("id", "codeblock");

  var codeBlockHeader = document.createElement('div');
  codeBlockHeader.setAttribute("id", "codeheader");

  //Read the file
  rawFile = LoadFile(fileName);
  if (rawFile == null)
    return;

  var code = document.createTextNode(rawFile);
  var codeDiv = document.createElement('div');
  var pre = document.createElement('pre');
  pre.appendChild(code);

  codeDiv.setAttribute("id", fileName);
  codeDiv.appendChild(pre);

  //Create head for codeblock
  var header = document.createElement('H2');
  var headerText = document.createTextNode(fileName);
  header.appendChild(headerText);

  //create and add buttons in <h2> title
  var collapseButton = document.createElement('button');
  collapseButton.onclick = function() { Collapse(collapseButton, fileName); }
  collapseButton.className = "button-collape";

  header.appendChild(collapseButton);

  var copyButton = document.createElement('button');
  copyButton.onclick = function() { CopyDivToClipboard(fileName); }
  copyButton.className = "button-copy";

  header.appendChild(copyButton);

  //append in order
  codeBlockHeader.appendChild(header);
  codeBlock.appendChild(codeBlockHeader);
  codeBlock.appendChild(codeDiv);

  instructionBlock.appendChild(codeBlock);


}
