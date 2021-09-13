import React, { useState, useEffect } from 'react';
import '../style/App.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Todo({ list, index, loeschen, image }) {
	return (
		<div className="listElements">
			{
			//Der Auszugebende text wird hier angegeben. Dies sind die default text und die ausgewählten Titel
			}
			<a className="listElementsText">{list.text}</a>

			<div className="listElementsButton">
				{
					//Das löschen der jeweiligen Title aus der Liste wird hier veranlasst.
					//Mittels des Buttons wird auf die Lösch Konstante zugegriffen
				}
				<a onClick={() => loeschen(index)}>X</a>
			</div>
		</div>
	);
}

function App() {
	const [data, setData] = useState({ items: [] });
	//const urlData = 'https://reactnative.dev/movies.json'
	const urlData = 'https://imdb-api.com/en/API/IMDbList/k_dn26uu3c/ls004285275';
	const [cookies, setCookie] = useCookies(['movies']);

	useEffect(() => {
		const result = async () => {
			const response = await axios(urlData);
			setData(response.data);
		};
		result();
	}, []);

	/**
	 * Fetchen der Daten aus der API
	 * Map Methode verwendet
	 * durch das anklicken der Titel, wird ein hinzufügen absolviert.
	 */
	const fetchData = data.items.map((item) => {
		return (
			<div
				className="fetchElements"
				onClick={() => hizufuegen(item.title)}
			>
				<a className="listElementsText">
					{item.title}
				</a>
			</div>
		);
	});

	//Array für die Auflistung der vorhandenen, bzw. neuen To-Dos
	const [watchList, setWatchList] = useState([
		// die gefetcheten daten kommen rein
		//default watchList, damit die Liste nicht leer angezeit wird
		{
			text: 'Film 1',
		},
		{
			text: 'Film 2 ',
		},
		//Objekte werden erkannt, jedoch nicht als Text ausgegeben.
		// {
		//   text: cookies["movies"].toString("text")
		// },
	]);

	/**
	 * Cookies werden hier gespeichert
	 */
	function createCookie() {
		setCookie('movies', watchList);
		return <a>{cookies}</a>;
	}

	/**
	 * Funktionalitäten:
	 * Löschen, Honzufügen & alles Löschen
	 */
	//Konstente für das löschen des ToDo's
	const loeschen = (index) => {
		const newWatchList = [...watchList];
		newWatchList.splice(index, 1);
		setWatchList(newWatchList);
	};
	//Konstante für die Löschung der gesamten Tabelle
	const allesLoeschen = (index) => {
		const newWatchList = [...watchList];
		newWatchList.splice(index);
		setWatchList(newWatchList);
	};
	//Konstente für das Hinzufügen eines Textes.
	const hizufuegen = (text) => {
		const newWatchList = [...watchList, { text }];
		setWatchList(newWatchList);
	};
	return (
		<div className="mainContainer">
			{/**Um ein gesplittetes Screen zu erhalten muss, innerhalb des mainContainer-Style Komonente, die Style Komponente "mainElements" zweifach auftauchen. */}
			<div className="mainElements">
				<h3>
					Anzahl der ausgwählten Filme{' '}
					{watchList.length}
				</h3>
				{/**
				 * Das erstellte Array "watchList" wird hier mittels der .map Methode aufgelistet
				 */}
				{watchList.map((list, index) => (
					//die erstellte Funktion "Todo" wird als React Komponente eingebuden.
					//Die Parameter in der Funktion bekommen hierbei die entsprechenden Konstenten zugewiesen
					<Todo
						index={index}
						list={list}
						watchList={cookies.toString()}
						loeschen={loeschen}
						allesLoeschen={allesLoeschen}
						hizufuegen={hizufuegen}
					/>
				))}
				<button
					onClick={() => allesLoeschen()}
					className="listButtons"
				>
					Alle Filme in der Watch-Liste löschen
				</button>
				<button
					onClick={() =>
						createCookie() &&
						alert(
							'Diese Liste wurde mit ' +
								cookies.movies.length +
								' Elementen gespeichert!',
						)
					}
					className="listButtons"
				>
					Die Watch-List speichern
				</button>
				{/**Die Daten ausgewählten DAten werden als Cookie gespeichert. Siehe Console */}
				{console.log(cookies['movies'])}
			</div>
			<div className="mainElements">
				<h2>Vorhandene Filme</h2>
				<h3>
					Bitte klicken Sie den jeweilgen Titel
					an!
				</h3>
				{/* Die Daten die gezogen wurden werden hier angezeigt */}
				{data && fetchData}
			</div>
		</div>
	);
}
export default App;
