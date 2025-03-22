import PropTypes from 'prop-types';

const AppProvider = ({ children }) => (
  children
);

const propTypes = {
  children: PropTypes.node.isRequired,
};

AppProvider.propTypes = propTypes;
export default AppProvider;