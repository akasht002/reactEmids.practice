export const getModal = (data) => {
  return {
    patientId: data.patientId,
    patientAddressId: 0,
    streetAddress: data.address.streetAddress,
    street: data.address.streetAddress,
    stateName: data.address.stateName,
    stateId: parseInt(data.address.stateId, 10),
    state: {
      id: parseInt(data.address.stateId, 10),
      name: data.address.stateName
    },
    city: data.address.city,
    zip: data.address.zip ? parseInt(data.address.zip, 10) : 0,
    isPrimaryAddress: data.isPrimaryAddress ? data.isPrimaryAddress : false,
    isActive: true,
    addressTypeId: data.address.addressType,
    isAddressVerified: false,
    lat: 0,
    lon: 0,
    addressId: 0,
    zipCode: data.address.zip
  }
}