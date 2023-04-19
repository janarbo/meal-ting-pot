import React from 'react';
import { useState, useEffect } from 'react';
import { useCreateProfileMutation } from './features/chef-profile/chefProfileApi';
import {useNavigate} from 'react-router-dom'

function ProfileForm(){
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState(false);

  const [featuredmenuitem, setFeaturedMenuItem] = useState('');
  const [tagname, setTagName] = useState ('');

  const navigate = useNavigate();
  const [createProfile] = useCreateProfileMutation();

  const handleOnClick = () => {
    availability ? setAvailability(false): setAvailability(true);
  }

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const url = 'http://localhost:8000/tags';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setTags(data);
    }
  }
    fetchData();
  }, []);

  const [featuredMenuItemName, setFeaturedMenuItemName] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        'full_name':fullname,
        'email': email,
        'photo': photo,
        'phone_number':phonenumber,
        'address': address,
        'bio':bio,
        'availability': availability,
        'tags':tagname,
        "featured_menu_item":featuredmenuitem,
      };
        await createProfile(payload);
        console.log(payload)
        navigate('/home');
          } catch (error) {
            console.log(error)
          }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          label='Full name'
          id='fullname'
          placeholder='Full Name'
          value={fullname}
          onChange={(e) => setFullName(e.target.value)} >
        </input>
        <input
          label='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)} >
        </input>
        <input
          label='photo'
          id='photo'
          placeholder='Photo'
          value={photo}
          onChange={e => setPhoto(e.target.value)} >
        </input>
        <input
          label='Phone Number'
          id='phonenumber'
          placeholder='Phone Number'
          value={phonenumber}
          onChange={e => setPhoneNumber(e.target.value)} >
        </input>
        <input
          label='address'
          id='address'
          placeholder='Address'
          value={address}
          onChange={e => setAddress(e.target.value)} >
        </input>
        <input
          label='Bio'
          id='bio'
          placeholder='Bio'
          value={bio}
          onChange={e => setBio(e.target.value)} >
        </input>
        <input
          onClick={handleOnClick}
          label='Availability'
          id='availability'
          type="checkbox"
          placeholder='Availability'
          value={availability}
           />
        <label htmlFor="chef">Availability</label>

        <select
          label='tags'
          id='tags'
          value={tagname}
          onChange={(e) => setTagName(e.target.value)}>
          <option value=''>Choose a tag</option>
            {tags.map(tag => {
              return (
                <option key={tag.id} value={tag.id} >
                  {tag.name}
                </option>
              );
            })}
        </select>
        <input
          label='Featured Menu Item'
          id='featuredmenuitem'
          placeholder='Featured Menu Item'
          value={featuredmenuitem}
          onChange={e => setFeaturedMenuItem(e.target.value)} >
        </input>
        <button type="submit">Save</button>

      </form>
    </div>
  );
}
export default ProfileForm;
