export const transformGadget = (gadgetInstance) => {
  const gadget = gadgetInstance.toJSON();

  delete gadget.createdAt;
  delete gadget.updatedAt;

  for (const key in gadget) {
    if (gadget[key] === null) {
      delete gadget[key];
    }
  }

  gadget.description = `The ${gadget.name} - ${gadget.mission_success_probability}% success probability (${gadget.skin} skin)`;

  delete gadget.name;
  delete gadget.skin;
  delete gadget.mission_success_probability;
  
  return gadget;
};
