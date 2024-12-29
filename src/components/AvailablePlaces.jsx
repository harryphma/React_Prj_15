import Places from './Places.jsx';
import { useState, useEffect } from 'react';
import ErrorPage from './Error.jsx';



export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces(){
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok){
          throw new Error('Failed to fetch places');
          
        }

        setAvailablePlaces(resData.places);
      } catch (error){
        setError({message: error.message || 'Could not fetch places. Try again'});
      }
      
      setIsFetching(false);
    }

    fetchPlaces();
  }, []); 

  if (error){
    return (
      <ErrorPage title='An error occured!' message={error.message}></ErrorPage>
    );
  }

  

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText = "Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
