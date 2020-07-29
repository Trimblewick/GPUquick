function ClearSelection()
{
 if (window.getSelection)
 {
   window.getSelection().removeAllRanges();
 }
 else if (document.selection)
 {
   document.selection.empty();
 }
}

function CopyDivToClipboard(id)
{
     var range = document.createRange();
     var container = document.getElementById(id);

     if (container.style.display === "none")
     {
       container.style.display = "block";
       range.selectNode(container);
       window.getSelection().removeAllRanges();
       window.getSelection().addRange(range);
       document.execCommand("copy");
       container.style.display = "none"
     }
     else
     {
       range.selectNode(container);
       window.getSelection().removeAllRanges();
       window.getSelection().addRange(range);
       document.execCommand("copy");
     }

     ClearSelection();
}



function Collapse(element, containerid)
{
  var content = document.getElementById(containerid);

  if (!content.style.display || content.style.display === "none")
  {
    content.style.display = "block";
    if (element.className === 'button-collapse')
    {
	    element.style.backgroundImage = "url(minimize.png)";
    }
  }
  else
  {
    content.style.display = "none";
    if (element.className === 'button-collapse')
    {
    	    element.style.backgroundImage = "url(maximize.png)";
    }
  }
}
