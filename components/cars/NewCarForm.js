import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewCarForm.module.css';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';


function NewCarForm({}) {
  const router = useRouter();
  const brandInputRef = useRef();
  const modelInputRef = useRef();
  const imageInputRef = useRef();
  const hpInputRef = useRef();
  const transmitionInputRef = useRef();
  const descriptionInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredBrand = brandInputRef.current.value;
    const enteredModel = modelInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredHp = hpInputRef.current.value;
    const enteredTransmition = transmitionInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const carData = {
      _id: uuidv4(),
      brand: enteredBrand,
      model: enteredModel,
      image: enteredImage,
      hp: enteredHp,
      transmition: enteredTransmition,
      description: enteredDescription,
    };
    
    const response = await fetch('/api/new-car',{
      method: 'POST',
      body: JSON.stringify(carData),
      headers: {
        'Content-Type' : 'application/json'
      }
    });

  const data = response.json();
  console.log(data);
  router.push('/');
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='brand'>Brand</label>
          <input type='text' required id='brand' ref={brandInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='model'>Model</label>
          <input type='text' required id='model' ref={modelInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Car image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='hp'>Hp</label>
          <input type='text' required id='hp' ref={hpInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='transmition'>Transmition</label>
          <input type='text' required id='transmition' ref={transmitionInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add car to collection</button>
        </div>
      </form>
    </Card>
  );
}

export default NewCarForm;
