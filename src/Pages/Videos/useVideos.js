import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useGetAllVideosQuery, useDeleteVideoMutation } from '../../Service/Apis/videosApi';
import { showNotification } from '../../utils/notification';
import { useDebounce } from '../../utils/useDebounce';

export const useVideos = (searchQuery) => {
    const [activePage, setActivePage] = useState(1);
    const [section, setSection] = useState('all');
    const [opened, { open, close }] = useDisclosure(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [uploadModalOpened, { open: openUploadModal, close: closeUploadModal }] = useDisclosure(false);
    const [playerModalOpened, { open: openPlayerModal, close: closePlayerModal }] = useDisclosure(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch videos
    const { data: allVideos, isLoading, refetch } = useGetAllVideosQuery({
        pageNumber: activePage,
        pageSize: 6,
        search: useDebounce(searchQuery, 500) || '',
        section: section === 'all' ? '' : section,
    });

    // Delete mutation
    const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

    const handleSectionChange = (value) => {
        setSection(value);
        setActivePage(1);
    };

    const handleDeleteClick = (id) => {
        setCurrentVideoId(id);
        open();
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteVideo({ id: currentVideoId }).unwrap();
            showNotification.success({
                title: 'Video Deleted',
                message: 'Video has been deleted successfully.',
            });
            close();
            refetch();
        } catch (error) {
            console.error('Error deleting video:', error);
            showNotification.error(error?.data?.message || 'Error deleting video');
        }
    };

    const handleUploadSuccess = () => {
        closeUploadModal();
        refetch();
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        openPlayerModal();
    };

    return {
        activePage,
        setActivePage,
        section,
        handleSectionChange,
        opened,
        close,
        currentVideoId,
        isDeleting,
        allVideos,
        isLoading,
        handleDeleteClick,
        handleConfirmDelete,
        uploadModalOpened,
        openUploadModal,
        closeUploadModal,
        handleUploadSuccess,
        playerModalOpened,
        closePlayerModal,
        selectedVideo,
        handleVideoClick,
    };
};
