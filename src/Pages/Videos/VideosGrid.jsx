import { Grid } from "@mantine/core";
import VideoCard from "./VideoCard";

const VideosGrid = ({ videos, onVideoClick, onDeleteClick }) => {
    return (
        <Grid gutter="lg">
            {videos?.map((video) => (
                <Grid.Col key={video.id} span={{ base: 12, sm: 6, lg: 4 }}>
                    <VideoCard
                        video={video}
                        onPlay={onVideoClick}
                        onDelete={onDeleteClick}
                    />
                </Grid.Col>
            ))}
        </Grid>
    );
};

export default VideosGrid;
