import { useState } from 'react';
import WeatherBox from '../components/WeatherBox';
import { getWeather } from '../services/getWeather';
import { DateBuilder } from '../components/DateBuilder';

const Landing = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');

	const searchLocation = () => {
		getWeather(location)
			.then((data) => setData(data))
			.catch(
				(e) =>
					console.error(e) ===
					alert('Could not find this location, please try again')
			);
	};

	const enter = (e) => {
		if (e.key === 'Enter') searchLocation();
	};

	const handleChangeWeather = (e) => setLocation(e.target.value);

	return (
		<div
			className={
				data.weather !== undefined
					? data.weather[0].main === 'Clouds'
						? 'app app_clouds'
						: data.weather[0].main === 'Clear'
						? 'app app_clear'
						: data.weather[0].main === 'Rain'
						? 'app app_rain'
						: data.weather[0].main === 'Snow'
						? 'app app_snow'
						: data.weather[0].main === 'Drizzle'
						? 'app app_drizzle'
						: data.weather[0].main === 'Thunderstorm'
						? 'app app_thunderstorm'
						: data.weather[0].main === ('Haze' || 'Mist' || 'Smooke')
						? 'app app_haze'
						: 'app'
					: 'app'
			}
		>
			<p className='titleWeather'>Weather App</p>
			<div className='search'>
				<input
					className='input-search'
					value={location}
					onChange={handleChangeWeather}
					onKeyPress={enter}
					placeholder='Enter Location'
					type='text'
				/>
				<button className='btnSearch' onClick={searchLocation}>
					<label>Search</label>
				</button>
			</div>
			<h2 className={data.name ? 'date_hidden' : 'date'}>
				{DateBuilder(new Date())}
			</h2>
			<WeatherBox data={data} />
		</div>
	);
};

export default Landing;
