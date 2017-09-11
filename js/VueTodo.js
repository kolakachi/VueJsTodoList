 var Items = [];// variable to hold list Items.




if( JSON.parse( localStorage.getItem( 'Items' ))){
  //set listItems to Items in local storage
  Items = JSON.parse( localStorage.getItem( 'Items' ));
}
else{

//if temporary storage to hold listItems is not set
  localStorage.setItem("Items", JSON.stringify( Items ));
}
   var app = new Vue({
    el:'#app',
    data:{
      Message:"",
      NewItem:"",
      
      ListItems: Items
    },
    methods:{
      AddToList: function(){

          if(this.NewItem.length>0 && !this.CheckForDuplicates( this.NewItem )){
              this.ListItems.push({
                name: String(this.NewItem)
            
              });
              Items = this.ListItems;
              this.NewItem ="";
              localStorage.setItem("Items", JSON.stringify( this.ListItems ));
              this.Message = "Added To List";
              
          }
          else{
              this.Message = "Item exist already or you didn't input anything";
        }
      },

      CheckForDuplicates: function( listitem ){
        var match = false;

        this.ListItems.forEach(function( item ) {
          if( item.name === listitem )
            match = true;
        });

        return match;
      },


      DeleteThis: function(event){
        this.ListItems.forEach(function( value ) {
          if(value.name == event.target.innerText)
          {
             var id = Items.indexOf( value );
             Items.splice(id, 1 );
          }
        });

        this.ListItems = Items;
        localStorage.setItem("Items", JSON.stringify( this.ListItems ));
        
        this.Message = "Removed From List";
      
        

      },

      DeleteAll: function(){
        this.ListItems = [];
        localStorage.setItem("Items", JSON.stringify(this.ListItems));
        Items = [];
        this.Message = "Removed All";

        //alert("yea");

      }

    }

   })