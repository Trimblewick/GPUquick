function ReadTextFile(event)
{
      var input = event.target;

      var reader = new FileReader();
      reader.onload = function(){
        var text = reader.result;
        alert(text);
        /*
        var node = document.getElementById('output');
        node.innerText = text;
        console.log(reader.result.substring(0, 200));*/
      };
      reader.readAsText(input.files[0]);
};

function AddMenuButtons()
{
  var header = document.getElementsByTagName("header")[0];
  //Name, Href
  var listOfButtons = [
    ["Graphics", "dx.html"],
    ["Machine Learning", "ml.html"]
    //["blog", "asdf

  ]



  for (var i = 0; i < listOfButtons.length; ++i)
  {
    var textNode = document.createTextNode(listOfButtons[i][0]);
    var menuButton = document.createElement('div');
    var hyperLink = document.createElement('a');

// <div class="button-menu"><a href="dx.html">Graphics</a></div>

    //add link and text to button
    hyperLink.href = listOfButtons[i][1];
    hyperLink.appendChild(textNode);

    menuButton.className = 'button-menu';
    menuButton.appendChild(hyperLink);

    header.appendChild(menuButton);

  }


}

function AddCodeBlock(instructionBlockId)
{
  var instructionBlock = document.getElementById(instructionBlockId);


  var codeBlock = document.createElement('div');
  codeBlock.setAttribute("id", "textblock-code");

  var codeBlockHeader = document.createElement('div');
  codeBlockHeader.setAttribute("id", "textblock-code-header");

  //Read the file


  //Create head for codeblock
  var header = document.createElement('H2');
  var headerText = document.createTextNode("HeaderText");
  header.appendChild(headerText);


  //create and add buttons in <h2> title
  var collapseButton = document.createElement('button');
  collapseButton.onclick = function() { Collapse(collapseButton, 'main.cpp'); }
  collapseButton.className = "button-collape";

  header.appendChild(collapseButton);

  var copyButton = document.createElement('button');
  copyButton.onclick = function() { CopyDivToClipboard('main.cpp'); }
  copyButton.className = "button-copy";

  header.appendChild(copyButton);

//append in order
  codeBlockHeader.appendChild(header);
  codeBlock.appendChild(codeBlockHeader);

  instructionBlock.appendChild(codeBlock);


}
