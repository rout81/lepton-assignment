import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import styles from "./index.module.scss";

interface IProps {
	layerVisibility: { id: string; show: boolean }[];
	toggleVisibility: (arg1: string) => void;
}

const MapOverlay = (props: IProps) => {
	const { layerVisibility, toggleVisibility } = props;
	return (
		<List
			className={styles.mapOverlay}
			sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
			component="nav"
		>
			{layerVisibility.map((layer) => (
				<ListItemButton>
					<ListItem
						secondaryAction={
							<IconButton
								onClick={() => toggleVisibility(layer.id)}
								edge="end"
								aria-label="eye"
							>
								{layer.show ? (
									<RemoveRedEyeOutlinedIcon />
								) : (
									<VisibilityOffOutlinedIcon />
								)}
							</IconButton>
						}
					>
						<ListItemText primary={layer.id} />
					</ListItem>
				</ListItemButton>
			))}
		</List>
	);
};
export { MapOverlay };
