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
    <input name="player-name" v-model="player.name" id="input-player" type="text" placeholder="Enter player name"/>
    <button id="add-btn" type="submit" >Add</button>
  </form>
  <p>{{player}}</p>
  </div>`


};


const ListPlayerComponent = {
  name: "list-player",
  // TODO: Implement the <list-player> component here.

  props: ['playerItem'],

  // components: [ShowPlayerComponent],
  methods: {

    //Get the id of clicked player from current's component's prop playerItem
    playerClicked: function(){
      const id = this.playerItem.id;
      console.log("id = ", id);

      //shout to public there is a parameter id, whoever can catch it, note here should use like 'clickkk' an uniqe name.
      this.$root.$emit('clickkk', id);

    }

  },

  template: 
  `<li @click="playerClicked" :id="'player-'+playerItem.id">
    <a href="#">{{playerItem.name}}</a>
  
  </li>`
  
};





const ListPlayersComponent = {
  name: "list-players",
  // TODO: Implement the <list-players> component here.
  data: function () {
    return {
      players: [],
      clickedPlayer: {
        name: '',
        id:0,
        isActive:''

      },
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
  `
  <ol id="players-list" >
    <list-player 
      v-for="player in players" 
      v-bind:playerItem="player"
      v-bind:name="player.name"
      :key="player.id"
      
    ></list-player>

  </ol>
  `,

  created(){
    this.listPlayers();
  },
  
};


const ShowPlayerComponent = {
  name: "show-player",
  // TODO: Implement the <show-player> component here.
  data: function(){
    return {
      selectedPlayer: {
        name: '',
        id: '',
        isActive: ''
      },
      reqStatus: ''
    }
  },

  methods:{
    
    getAndShowPlayer(id){
      
      this.reqStatus = 'Loading...';
      fetch(`http://localhost:3001/api/players/${id}`)
      .then(res=>res.json())
      .then(data=>{
        this.selectedPlayer = data;
        this.reqStatus = '';
        console.log("data = ", data);
        return data;
        
      }).catch(error => {
        this.reqStatus = 'An error has occured!!!';
      });

    },

    deletePlayer(aId){
      console.log("deee myID type = ", typeof(aId));
      console.log("del aId = " ),aId.target.value; 
      // const player = {
      //   id: myId,
      //   name : `${this.selectedPlayer.name}`,
      //   isActive: false
      // };
      const reqOptions = {
        method: "DELETE",
        // headers: {"Content-Type": "application/json"},
        // body: JSON.stringify(player)
      };
      fetch(`http://localhost:3001/api/players/${aId}`, reqOptions)
        .then(response => response.json())
        .then(data => {
          this.player = data;
          console.log("DELdata = ", data)});
    },

  },


  //Here catch the id shouted by "clickkk" event emitted in li element li ListPlayerComponent
  mounted: function () { 
    this.$root.$on('clickkk', (myId) => { 
      this.selectedPlayer.id = myId;
      console.log("myId = ", myId);
      this.getAndShowPlayer(myId);
      
    })
  },
  

  template: 
  `<div id="selected-player">
    <div className="player-id">{{selectedPlayer.id}}</div>
    <div className="player-name">{{selectedPlayer.name}}</div>
    <div className="player-status">{{selectedPlayer.isActive}}</div>
    <button @click="deletePlayer" className="delete-btn">Delete</button>
  </div>`

  // template: 
  // `<div id="selected-player">
  //   <div className="player-id">{{selectedPlayer.id}}</div>
  //   <div v-bind:name="selectedPlayer.name" className="player-name">{{selectedPlayer.name}}</div>
  //   <div :key="selectedPlayer.id" className="player-status">{{selectedPlayer.isActive}}</div>
  //   <button @click="deletePlayer" className="delete-btn">Delete</button>
  // </div>`
};




const RequestStatusComponent = {
  name: "request-status",
  // TODO: Implement the <request-status> component here.
  props: ['reqStatus'],
  template:
  '<div id-"request-status">{{reqStatus}}</div>'

};

const App = {

  template: `
    <div>
        <p>
        // <h1>Manage hockey players with Vue</h1>

          // TODO: Implement the App component here.
          
          <add-player></add-player>
         
          <list-players></list-players>
          <show-player></show-player>
          <request-status></request-status>
  
        </p>
    </div>
  `,
};

 