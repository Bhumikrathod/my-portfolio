import './SkeletonCard.css';

function SkeletonCard({ count = 3 }) {
    return (
        <div className="skeleton-wrap">
            {Array.from({ length: count }).map((_, i) => (
                <div className="skeleton-card" key={i}>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line long"></div>
                    <div className="skeleton-line medium"></div>
                </div>
            ))}
        </div>
    );
}

export default SkeletonCard;