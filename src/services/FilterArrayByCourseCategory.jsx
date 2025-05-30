import React from 'react';

const FilterArrayByCourseCategory = ({ certArray }) => {
  
  const groupedByCourse = {};

  certArray.forEach(cert => {
const categoryName = cert.category || "Okänd kategori";

    if (!groupedByCourse[categoryName]) {
      groupedByCourse[categoryName] = [];
    }

    groupedByCourse[categoryName].push(cert.certName);
  });

  return (
    <div>
      {Object.entries(groupedByCourse).map(([courseName, certNames]) => (
        <div onClick={(e) => e.stopPropagation()} key={courseName} style={{ marginBottom: '1rem' }}>
          <h4>{courseName}</h4>
          
            {certNames.map((certName, index) => (
              <p key={index}>{certName}</p>
            ))}
          
        </div>
      ))}
    </div>
  );
};

export default FilterArrayByCourseCategory;
