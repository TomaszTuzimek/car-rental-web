import CarItem from './CarItem';
import classes from './CarList.module.css';

function CarList(props) {
  return (
    <ul className={classes.list}>
      {props.cars.map((car) => (
        <CarItem
          key={car.id}
          id={car.id}
          image={car.image}
          title={car.title}
          address={car.address}
          description={car.description}
        />
      ))}
    </ul>
  );
}

export default CarList;
