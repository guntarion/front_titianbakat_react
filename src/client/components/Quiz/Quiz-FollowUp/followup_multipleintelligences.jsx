// src/client/components/Quiz/Followup_MultipleIntelligences.jsx

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import config from '../../../../config'; 

const Followup_MultipleIntelligences = ({ type, category, updatePoints }) => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState({});
  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/followup/${type}/${category}`);
        const activityList = response.data.split("__").filter(activity => activity.trim() !== "");
        setActivities(activityList);
      } catch (error) {
        console.error("Error fetching follow-up activities:", error);
      }
    };

    if (type && category) {
      fetchActivities();
    }
  }, [type, category]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % activities.length);
  };

  const handleSelect = (index) => {
    const newSelectedItems = { ...selectedItems };
    const item = activities[index];
    const points = category === "aktivitas" ? 2 : category === "proyek" ? 4 : 6;

    if (newSelectedItems[item]) {
      updatePoints(-points);
      delete newSelectedItems[item];
    } else {
      const totalPoints = Object.values(newSelectedItems).reduce((acc, item) => acc + item.points, 0) + points;
      if (totalPoints > 20) {
        toast.error("Maximum follow up activities is 20 points");
        return;
      }
      newSelectedItems[item] = { category, points };
      updatePoints(points);
    }
    setSelectedItems(newSelectedItems);
  };

  const currentActivity = activities[currentIndex];
  const isSelected = selectedItems[currentActivity];

  return (
    <div>
      <Toaster />
      <h3>
        {category === "aktivitas" ? "Tindak Lanjut Aktivitas" :
         category === "proyek" ? "Tindak Lanjut Proyek" :
         "Tindak Lanjut Kebiasaan"}
      </h3>
      <div
        style={{
          backgroundColor: isSelected ? "yellow" : "transparent",
          padding: "10px",
          border: "1px solid black",
        }}
      >
        <input
          type="checkbox"
          checked={!!isSelected}
          onChange={() => handleSelect(currentIndex)}
        />
        {currentActivity}
      </div>
      <button onClick={handleNext} className="btn btn-primary">Next</button>
      <button onClick={() => console.log(selectedItems)} className="btn btn-primary">Do Follow Up</button>
    </div>
  );
};

Followup_MultipleIntelligences.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  updatePoints: PropTypes.func.isRequired,
};

export default Followup_MultipleIntelligences;
