import './TechTicker.css';

const techs = ['Python', 'React.js', 'JavaScript', 'Flask', 'MySQL', 'MongoDB', 'Node.js', 'REST APIs', 'Git', 'HTML5', 'CSS3', 'Bootstrap'];

function TechTicker() {
    const doubled = [...techs, ...techs];
    return (
        <div className="ticker-wrap">
            <div className="ticker-track">
                {doubled.map((tech, i) => (
                    <span className="ticker-item" key={i}>{tech}</span>
                ))}
            </div>
        </div>
    );
}

export default TechTicker;