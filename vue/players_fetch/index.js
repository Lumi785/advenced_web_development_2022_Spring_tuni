"use strict";

const template= `
<div>
  <div>
    <h3>Players List</h3>
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
      
      players: [],
      selectedPlayer:{
        name: '',
        id: 0,
        isActive: false
      },
     
      reqStatus: ''

    }
  },

  methods: {
    
    getPlayers(){
      this.reqStatus = 'Loading...';
      fetch("http://localhost:3001/api/players")
      .then(res=>res.json())
      .then(data=>{
        this.players = data;
        this.reqStatus = '';
        // console.log("data = ", data);
        return data;
        
      }).catch(error => {
        this.reqStatus = 'An error has occured!!!';
      })
    },

    //I have to use fetch to send get request again, because I don't know how to let 'Loading...' go away after player has successfully fetched, tried async as bellow commented-out codes, but not work 
    getPlayer(id){
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
      })
    },
    
    // getPlayer(id){
    //   this.reqStatus = 'Loading...';
    //   this.selectedPlayer = this.players.filter(player => player.id === id)[0];
    //   async function temp(){
    //     this.reqStatus = 'jhdjvfdvb';
    //   };
    //   (async () => await temp)();
    // }

  },

  //this should be outside of methods!
  created(){
    this.getPlayers();
  },

    

}
  
