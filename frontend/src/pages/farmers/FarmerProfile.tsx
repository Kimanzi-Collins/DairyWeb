import { useParams } from 'react-router-dom';

export default function FarmerProfile() {
    const { id } = useParams();

    return (
        <div>
            <h2>Farmer Profile: {id}</h2>
            <p>We'll build this out with lifetime earnings, charts, and statement data.</p>
        </div>
    );
}