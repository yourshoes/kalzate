import RxDB from './client';

const ClientFactory = async (...options) => RxDB(...options);

export default ClientFactory;