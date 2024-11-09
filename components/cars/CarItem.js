import Card from '../ui/Card';
import classes from './CarItem.module.css';
import { useRouter } from 'next/router';

function CarItem(props) {
  const router = useRouter()

function handleShowDetails(){
  router.push('/' + props.id);
}

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.brand} />
        </div>
        <div className={classes.content}>
          <h3>{props.model}</h3>
          <address>{props.hp}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={handleShowDetails}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default CarItem;
