function AddMenuButtons()
{
  var header = document.getElementsByTagName("header")[0];
  //Name, Href
  var listOfButtons = [
    ["Recipes", "recipes.html"],
    ["Blog", "blog.html"],
    ["Vim", "vim.html"]
  ];

  var voidButton = document.createElement('div');
  voidButton.setAttribute('class', 'button-menu-void');
  header.appendChild(voidButton);

  var currentPage = window.location.pathname.split("/").pop();
  for (var i = 0; i < listOfButtons.length; ++i)
  {
    var textNode = document.createTextNode(listOfButtons[i][0]);
    var menuButton = document.createElement('div');
    var hyperLink = document.createElement('a');
    menuButton.setAttribute('class', 'button-menu linkhover');
    menuButton.onclick = function () { currentButton=listOfButtons[i][0]; };

    if (listOfButtons[i][1] != currentPage)
    {
      hyperLink.href = listOfButtons[i][1];
    }
    else
    {
			menuButton.setAttribute('style', 'border-bottom-color: #444; background-color: #444;');
			hyperLink.setAttribute('style', 'color: black;');
    }

    hyperLink.appendChild(textNode);
    menuButton.appendChild(hyperLink);

    //append button
    header.appendChild(menuButton);
    //append void button inbetween
    voidButton = document.createElement('div');
    voidButton.setAttribute('class', 'button-menu-void');
    header.appendChild(voidButton);
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

function AddCollapsableBlockHeader(idcollapse, rubriktext)
{
  var parentTag = document.getElementsByTagName('script');
  parentTag = parentTag[parentTag.length - 1].parentNode;

  var colblockhead = document.createElement('div');
  colblockhead.setAttribute("id", "collapsableblockheader");
  var buttondiv = document.createElement('div');
  var buttonCopy = document.createElement('button');
  var buttonCol = document.createElement('button');
  buttonCopy.setAttribute("class", "button-copy"); 
  buttonCopy.setAttribute("onclick", "CopyDivToClipboard('"+idcollapse+"')"); 
  buttonCol.setAttribute("class", "button-collapse"); 
  buttonCol.setAttribute("onclick", "Collapse(this, '"+idcollapse+"')"); 
  buttondiv.appendChild(buttonCopy);
  buttondiv.appendChild(buttonCol);

  var rubrik = document.createElement('h2');
  var rubrikTextNode = document.createTextNode(rubriktext);
  rubrik.appendChild(rubrikTextNode);

  colblockhead.appendChild(buttondiv);
  colblockhead.appendChild(rubrik);

  parentTag.appendChild(colblockhead);
}

