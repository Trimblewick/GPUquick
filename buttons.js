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

function CopyToClipboard(containerid)
{
  if (document.selection)
  {
      var range = document.body.createTextRange();
      var container = document.getElementById(containerid);
      range.moveToElementText(container);
      range.select().createTextRange();
      document.execCommand("copy");

  }
  else if (window.getSelection())
  {
      var range = document.createRange();
      var container = document.getElementById(containerid);
      range.moveToElementText(container);
      window.getSelection().addRange(range);
      document.execCommand("copy");

  }
  //ClearSelection();
};

function Collapse(element, containerid)
{
  var content = document.getElementById(containerid);

  if (content.style.display === "none")
  {
    content.style.display = "block";
    element.style.backgroundImage = "url(minimize.png)";
  }
  else
  {
    content.style.display = "none";
    element.style.backgroundImage = "url(maximize.png)";
  }


};
