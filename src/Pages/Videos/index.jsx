import { useOutletContext } from "react-router-dom";
import { useVideos } from "./useVideos";
import { ConfirmModal } from "../../Components/ConfirmModal";
import UploadVideoForm from "../../Components/UploadVideoForm";
import VideoPlayerModal from "../../Components/VideoPlayerModal";
import Loader from "../../Components/Loader";
import VideosHeader from "./VideosHeader";
import EmptyState from "./EmptyState";
import VideosGrid from "./VideosGrid";
import PaginationComp from "../../Components/Pagination";
import { useTranslation } from "react-i18next";

const Videos = () => {
    const { searchQuery } = useOutletContext();
    const { t } = useTranslation();

    const {
        activePage,
        setActivePage,
        opened,
        close,
        isDeleting,
        allVideos,
        isLoading,
        handleDeleteClick,
        handleConfirmDelete,
        uploadModalOpened,
        openUploadModal,
        closeUploadModal,
        playerModalOpened,
        closePlayerModal,
        selectedVideo,
        handleVideoClick,
        section,
        handleSectionChange,
    } = useVideos(searchQuery);

    return (
        <>
            <>
                <VideosHeader
                    section={section}
                    onSectionChange={handleSectionChange}
                    totalCount={allVideos?.totalCount}
                    onUploadClick={openUploadModal}
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader isLoading={true} />
                    </div>
                ) : allVideos?.items?.length > 0 ? (
                    <EmptyState onUploadClick={openUploadModal} />
                ) : (
                    <>
                        <VideosGrid
                            videos={allVideos?.items}
                            onVideoClick={handleVideoClick}
                            onDeleteClick={handleDeleteClick}
                        />

                        <PaginationComp
                            activePage={activePage}
                            totalPages={allVideos?.totalPages}
                            onPageChange={setActivePage}
                        />
                    </>
                )}
            </>

            {/* Upload Modal */}
            <UploadVideoForm opened={uploadModalOpened} close={closeUploadModal} />

            {/* Video Player Modal */}
            <VideoPlayerModal
                opened={playerModalOpened}
                close={closePlayerModal}
                video={selectedVideo}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                opened={opened}
                close={close}
                title={t('delete_video_title')}
                description={t('delete_video_desc')}
                handleConfirm={handleConfirmDelete}
                actionText="delete"
                isLoading={isDeleting}
            />
        </>
    );
};

export default Videos;
