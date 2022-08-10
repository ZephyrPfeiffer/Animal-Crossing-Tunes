
// holds url to api being used
const url = 'http://acnhapi.com/v1/songs';

// defines the section in which audio elements will be dynamically added to
const musicSection = document.querySelector('#music-section');

// defines the parent element that will be listening for any letter button pushes on the category menu
const letterList = document.getElementById('letter-list');

// defines the parent element that will be listening for any letter button pushes on the category dropdown
const dropDownList = document.getElementById('letter-dropdown');


letterList.addEventListener('click', getSongs);
dropDownList.addEventListener('click', getSongs);

// will be used to store the song object returned from a fetch
let songData;

// fetch for getting song information from api used
fetch(url)
  .then(res => res.json())
  .then(data => {

    songData = data;

  })
  .catch(err => {

  console.log(`error: ${err}`);
    
  })
  
// populate the song section of the webpage with song name and audio pairs when a letter button is clicked
function getSongs(e) {

  // holds the references to each object within the data that is returned from fetch
  let songProperties = Object.keys(songData);

  let songs = [];
  let filteredSongs = [];

  // populates songs array with song objects
  for(let i = 0; i < songProperties.length; i++) {

    songs.push(songData[songProperties[i]]);

  }

  // populates filteredSongs array with song objects whose name starts with the value in the button that was pressed
  filteredSongs = songs.filter(song => (song['file-name'][4].toLowerCase() === e.target.value.toLowerCase()));

  if(filteredSongs.length > 0) {
    // clears all elements within music section before populating with song name and audio pairs
    musicSection.innerHTML = '';

    // creates a song name, image, and audio element group for each song object in the filtered songs array
    // then places the group of elements in the music seciton
    for(let i = 0; i < filteredSongs.length; i++) {

      // initialize element names
      let audioSection = document.createElement('section');
      let audioImage = document.createElement('img');
      let audioName = document.createElement('h3');
      let newAudio = document.createElement('audio');

      // create section to hold current song elements
      audioSection.classList.add('inner-container');

      // grab image for song
      audioImage.src = filteredSongs[i].image_uri;

      audioName.className = 'heading-alt';
      
      // grabs display name of song
      audioName.innerText = filteredSongs[i]['file-name'].slice(4);

      // gets audio file for song
      newAudio.src = filteredSongs[i].music_uri;
      newAudio.controls = true;

      // places all created elements in the dom
      musicSection.appendChild(audioSection);
      audioSection.appendChild(audioName);
      audioSection.appendChild(audioImage);
      audioSection.appendChild(newAudio);

    }
  }else{

    // if there are no songs in the filteredSongs array, provide a message that tells the user that there are no songs in the specified category
    musicSection.innerHTML = '';
    let notFoundMessage = document.createElement('p');
    notFoundMessage.innerText = `No songs were found from that category.`;
    notFoundMessage.className = 'tip';
    musicSection.append(notFoundMessage);

  }

}

