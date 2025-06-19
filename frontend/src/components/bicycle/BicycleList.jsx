// frontend/src/components/bicycle/BicycleList.jsx

import BicycleCard from './BicycleCard';

const BicycleList = ({ bicycles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bicycles.map((bicycle) => (
                <BicycleCard key={bicycle._id} bicycle={bicycle} />
            ))}
        </div>
    );
};

export default BicycleList;