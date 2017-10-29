$(() => {

  $(".markFinish").submit(function(event){
      event.preventDefault();
      console.log("work")
      const Data = $( this ).serialize()

      console.log(Data)

      $.post("/restaurant/:id/current", Data)
       .done()
    });





  });
