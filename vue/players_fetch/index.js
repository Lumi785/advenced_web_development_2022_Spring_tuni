"use strict";

const template= `
<div>
  <div>
    <h3>Players List</h3>
    <p>{{players}}</p>
    <ol id="players-list">
      <li
        v-for="player in players"
        :key="player.id"
        :id="'player-'+player.id"
      >
        <a @click.stop.prevent="getPlayer(player.id)" href="#"
          >{{player.name}}</a
        >
      </li>
    </ol>
  </div>
  <div>
    <h3>Selected Player</h3>
    <div v-if="selectedPlayer !== null" id="selected-player">
      <div id="player-name">{{selectedPlayer.name}}</div>
      <div id="player-status">
        {{selectedPlayer.isActive ? "active" : "not active"}}
      </div>
    </div>
  </div>
  <div id="request-status">{{reqStatus}}</div>
</div>
`

const App = {
//TODO: template, data and methods missing
 
  
  template: `<div id="root">${template}</div>`,
 

  data: function(){

    return {
      
      players: ["rose", "apple"],
      selectedPlayer:{
        name: String,
        id: Number,
        isActive: Boolean},
      newPlayer: {
        
      },
      alertMessage: 'myMessage',
      reqStatus: ''
      
      

    }


  },

  methods: {
    // async getPlayers(){
    //   const res = await fetch("http://localhost:3001/api/players");
    //   const data = await res.json();
      
    //   return data;
    //   console.log(data);
    // },
    
    getPlayers(){
      fetch("http://localhost:3001/api/players")
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        return data;
        
      })
    },
   
    // async created() {
    //   this.players = await this.getPlayers();

      
      
    //   console.log("appcreated")
    // },
    
    mounted(){
      this.players = this.getPlayers();
      console.log("m = ", players);


    }

    },

    created(){
      this.players = this.getPlayers();
      console.log("p = ", this.players);

    },

  

}
  
