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


const ListPlayerComponent = {
  name: "list-player",
  // TODO: Implement the <list-player> component here.

  props: ['playerItem'],

  template: 
  `<li>{{playerItem.name}}</li>`
  
};



const ListPlayersComponent = {
  name: "list-players",
  // TODO: Implement the <list-players> component here.
  data: function () {
    return {
      players: [],
      
      reqStatus: ''
    };
  },

  methods: {
    listPlayers(){
      this.reqStatus = 'Loading...';
      fetch("http://localhost:3001/api/players")
      .then(res=>res.json())
      .then(data=>{
        this.players = data;
        this.reqStatus = '';
        console.log("data = ", data[0].name);
        return data;
        
      }).catch(error => {
        this.reqStatus = 'An error has occured!!!';
      })
    },
  },

  components: {
    ListPlayerComponent
  },

  template: 
  `<ol id="players-list">
    <list-player 
      v-for="player in players" 
      v-bind:playerItem="player"
      v-bind:name="player.name"
      :key="player.id"
    ></list-player>

  </ol>`,

  created(){
    this.listPlayers();
  },
  
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
        <h1>Manage hockey players with Vue</h1>

          // TODO: Implement the App component here.
          
          <add-player></add-player>
          <p>reqStatus</p>
          <list-players></list-players>
        

        </p>
    </div>
  `,
};

 