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
