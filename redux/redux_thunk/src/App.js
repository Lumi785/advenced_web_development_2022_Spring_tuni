/** @format CONTAINERS*/

import { AddPlayer } from './components/AddPlayer';
import { PlayerInfo } from './components/PlayerInfo';
import { PlayersList } from './components/PlayersList';
import { RequestStatus } from './components/RequestStatus';


function App () {
	return(
		<>
		
		<AddPlayer/>
		<PlayersList/>
		<PlayerInfo/>
		<RequestStatus/>
		</>

	);
}
  

export default App;
