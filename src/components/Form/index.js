import { useContext, useState } from 'react';
import useForm from '../../hooks/form';
import { DisplayContext } from '../../context/Display';

const Form = () => {

  const [defaultValues] = useState({});
  const { showCompleted, changeItems, sortBy, storeSettings } = useContext(DisplayContext);
  const { handleChange, handleSubmit } = useForm(changeSettings, defaultValues);

  function changeSettings(newSettings) {
    showCompleted();
    changeItems(newSettings.itemsPerPage);
    sortBy(newSettings.sort);
    storeSettings();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <h2>Change Settings</h2>

        <label>
          <span>Show Completed?</span>
          <input onChange={handleChange} required name="completed" type="text" placeholder="true or false" />
        </label>

        <label>
          <span>Items Per Page</span>
          <input onChange={handleChange} required name="itemsPerPage" type="text" placeholder="number" />
        </label>

        <label>
          <span>Sort By</span>
          <input onChange={handleChange} required name="sort" type="text" />
        </label>

        <label>
          <button type="submit">Change Settings</button>
        </label>
      </form>
    </>
  )

}

export default Form;