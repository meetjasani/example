import React, { useState } from 'react';

const data = [
  {
    id: 1, name: 'India', parent_id: null, type: 'public',
  },
  {
    id: 2, name: 'Punjab', parent_id: 1, type: 'public',
  },
  {
    id: 5, name: 'Amritsar', parent_id: 2, type: 'public',
  },
  {
    id: 6, name: 'Wagah Border', parent_id: 5, type: 'public',
  },
  {
    id: 7, name: 'Attari', parent_id: 6, type: 'private',
  },
  {
    id: 8, name: 'Golden Temple', parent_id: 5, type: 'private',
  },
  {
    id: 10, name: 'Ludhiana', parent_id: 2, type: 'private',
  },
  {
    id: 3, name: 'Kerala', parent_id: 1, type: 'public',
  },
  {
    id: 9, name: 'Thiruvananthapuram', parent_id: 3, type: 'private',
  },
  {
    id: 4, name: 'Rajasthan', parent_id: 1, type: 'public',
  },
];

const App = () => {
  const [inputId, setInputId] = useState('');
  const [children, setChildren] = useState([]);

  const findChildren = (id) => {
  const children = [];
  const countryData = [id];

  while (countryData?.length > 0) {
    const currentId = countryData.pop();
    const currentChildren = data?.filter((item) => item?.parent_id === currentId);
    children?.push(...currentChildren?.map((item) => item?.id));
    countryData?.push(...currentChildren?.map((x) => x?.id));
  }

  return children;
};

  const handleChange = (e) => {
    setInputId(e.target.value);
  };

  const handleSearch = () => {
    if (inputId === '') {
      setChildren([]);
    } else {
      const id = parseInt(inputId, 10);
      const foundChildren = findChildren(id);
      setChildren(foundChildren);
    }
  };

  return (
    <div>
      <input type="number" value={inputId} onChange={handleChange} />
      <button onClick={handleSearch}>Find Children</button>
      <div>
        {children?.length === 0 ? (
          <p>No children found.</p>
        ) : (
          <ul>
            {children.map((childId) => {
              const child = data?.find((item) => item?.id === childId);
              return <li key={childId}>{child.name}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;