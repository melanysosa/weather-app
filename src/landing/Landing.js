import { useState } from 'react';
import {
	BsCloudLightningRain,
	BsCloudRain,
	BsClouds,
	BsSun,
	BsSnow,
	BsCloudHaze,
} from 'react-icons/bs';
import { DateBuilder } from '../components/DateBuilder';
import Header from '../components/Header';
import { getweather } from '../services/getweather';

const Landing = () => {
	const [data, setData] = useState({});
	const [location, setLocation] = useState('');

	const getSearch = () => {
		getweather(location)
		.then((data) => setData(data))
		.catch((e)=>console.log(e) === alert('Invalid city'));
	};

	const enter = (e) => {
		if (e.key === 'Enter') getSearch();
	};

	return (
		<div>
			<Header/>
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
				<div className='search'>
					<input
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						onKeyPress={enter}
						placeholder='Enter Location'
						type='text'
					/>
					<button className='btnSearch' onClick={getSearch}>
						<label>Search</label>
					</button>
				</div>
				<div className='container '>
					<div className='top'>
						<div className='location'>
							{data.name ? (
								<p>
									{data.name}, {data.sys.country}
								</p>
							) : null}
						</div>
						<div>
						
							<h2 className={data.name ? '' : 'date'}>
								{DateBuilder(new Date())}
							</h2>
						</div>
						<div className='temp'>
							<div>
								{data.main ? (
									<h1>{data.main.temp.toFixed()}°C</h1>
								) : null}
							</div>{' '}
							{data.main ? (
								<p>
									min: {data.main.temp_min.toFixed()}°C, max:{' '}
									{data.main.temp_max.toFixed()}°C
								</p>
							) : null}{' '}
							<div className='description'>
								{data.weather ? <p>{data.weather[0].main}</p> : null}
							</div>
							<div className='icon'>
								<h1>
									{data.weather ? (
										data.weather[0].main === 'Clouds' ? (
											<BsClouds />
										) : data.weather[0].main === 'Clear' ? (
											<BsSun />
										) : data.weather[0].main === 'Rain' ? (
											<BsCloudRain />
										) : data.weather[0].main === 'Snow' ? (
											<BsSnow />
										) : data.weather[0].main === 'Drizzle' ? (
											<BsCloudRain />
										) : data.weather[0].main === 'Thunderstorm' ? (
											<BsCloudLightningRain />
										) : data.weather[0].main ===
										  ('Haze' || 'Mist' || 'Smooke') ? (
											<BsCloudHaze />
										) : null
									) : null}
								</h1>
							</div>
						</div>{' '}
						{data.name !== undefined && (
							<div className='bottom'>
								<div className='feels'>
									{data.main ? <p>{data.main.feels_like}°C</p> : null}
									<p>Feels like</p>
								</div>
								<div className='humidity'>
									{data.main ? (
										<p className='bold'>{data.main.humidity}%</p>
									) : null}
									<p>Humidity</p>
								</div>
								<div className='wind'>
									{data.wind ? (
										<p className='bold'>
											{data.wind.speed.toFixed()} MPH
										</p>
									) : null}
									<p>Wind Speed</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
