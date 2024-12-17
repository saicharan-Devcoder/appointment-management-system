const TIME_SLOT_REGEX = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

const validateTimeSlotFormat = (timeSlot) => {
  return TIME_SLOT_REGEX.test(timeSlot);
};


module.exports=validateTimeSlotFormat;
