import maps from "../../../data/mapStyles.json";
import styles from "./index.module.scss";

const MapStyles = (props: {
	setMapStyle: (mapStyle: string) => void;
	mapStyle: string;
}) => {
	const { mapStyle, setMapStyle } = props;
	return (
		<div className={styles.mapStyles}>
			{maps.map((map) => (
				<span
					onClick={() => setMapStyle(map.url)}
					onKeyDown={() => setMapStyle(map.url)}
					className={[
						styles.mapStyle,
						mapStyle === map.url ? styles.selectedStyle : "",
					].join(" ")}
				>
					{map.name}
				</span>
			))}
		</div>
	);
};

export { MapStyles };
