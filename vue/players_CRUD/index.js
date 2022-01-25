"use strict";

const AddPlayerComponent = {
  name: "add-player",
  // TODO: Implement the <"add-player"> component here.
  
  data: function () {
    return {
      player: {
        name: '',
        id: 0,
        isActive: false 
      },
      reqStatus: ''
    };
  },

  methods: {
    addPlayer(){
      const player = {
        name : `${this.player.name}`,
        isActive: false
      };
      const reqOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(player)
      };
      fetch("http://localhost:3001/api/players", reqOptions)
        .then(response => response.json())
        .then(data => {
          this.player = data;
          console.log("data = ", data)});
    },
  },

  
// submit.prevent if no use prevent, console.log disappear quickly
  template: 
  `<div>
  <form @submit.prevent="addPlayer" id="submit-player" >
    <input v-model="player.name" id="input-player" type="text" placeholder="Enter player name"/>
    <button  id="add-btn" type="submit" >Add</button>
  </form>
  <p>{{player}}</p>
  </div>`


};


// Vue.component('button-counter', {
//   data: function () {
//     return {
//       count: 0
//     }
//   },
//   template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
// })




const ListPlayersComponent = {
  name: "list-players",
  // TODO: Implement the <list-players> component here.
  
};

const ListPlayerComponent = {
  name: "list-player",
  // TODO: Implement the <list-player> component here.
};

const ShowPlayerComponent = {
  name: "show-player",
  // TODO: Implement the <show-player> component here.
};

const RequestStatusComponent = {
  name: "request-status",
  // TODO: Implement the <request-status> component here.
};

const App = {
  template: `
    <div>
        <p>
          // TODO: Implement the App component here.
          
          <add-player></add-player>
        

        </p>
    </div>
  `,
};

 