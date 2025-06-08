
const AllComments = ({ tempComments }) => {

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold my-4">All Comments</h2>
            {tempComments.length === 0 ? (
                <p className="text-gray-500">No comments found.</p>
            ) : (
                <ul className="space-y-1">
                    {tempComments.map((comment) => (
                        <li
                            key={comment._id}
                            className="flex space-x-3 p-2 "
                        >
                            {/* Profile Picture */}
                            <img
                                src={comment.userProfile}
                                alt={comment.userName}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            {/* Comment Content */}
                            <div>
                                <div className="bg-gray-200 rounded-xl px-4 py-2">
                                    <p className="font-semibold text-sm text-gray-800">
                                        {comment.userName}
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        {comment.comment}
                                    </p>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {comment.commentDate}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllComments;
