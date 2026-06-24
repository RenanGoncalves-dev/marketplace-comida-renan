import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const colors = {
  primary: '#ff5a5f',      // Vermelho estilo app de comida
  secondary: '#2ecc71',    // Verde para preços e sucesso
  background: '#f8f9fa',   // Cinza claro para o fundo do app
  surface: '#ffffff',      // Branco para cards e containers
  textDark: '#2c3e50',     // Cor principal dos textos
  textLight: '#7f8c8d',    // Cor secundária (subtítulos e datas)
  border: '#e2e8f0',       // Cor das bordas e divisores
};

export default StyleSheet.create({
  // ==========================================
  // ESTILOS GERAIS & CONTAINERS
  // ==========================================
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },

  // ==========================================
  // COMPONENTE: HEADER 
  // ==========================================
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 70,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerLogo: {
    width: 130,
    height: 45,
  },
  headerIconBtn: {
    padding: 6,
    borderRadius: 20,
  },

  // ==========================================
  // AUTENTICAÇÃO (LOGIN / CADASTRO)
  // ==========================================
  authCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textDark,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  authButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchAuthText: {
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  switchAuthLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },

  // ==========================================
  // TELA INICIAL: FILTRO (DESAFIO)
  // ==========================================
  filterContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },

  // ==========================================
  // COMPONENTE: CARD DE ANÚNCIO (PRODUCT CARD)
  // ==========================================
  productCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#eaeaea',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  metaText: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 14,
    color: colors.textDark,
    lineHeight: 20,
    marginVertical: 10,
  },
  buyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ==========================================
  // TELA DE PERFIL (USUÁRIO LOGADO)
  // ==========================================
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  profileEmail: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 8,
  },
  profileMenu: {
    paddingHorizontal: 16,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginLeft: 12,
    flex: 1,
  },
  logoutButton: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  logoutButtonText: {
    color: colors.primary,
  },

  // ==========================================
  // ESTADOS VAZIOS OU ALERTA
  // ==========================================
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },

  // ==========================================
  // BOTÕES EXTRAS (PONTOS EXTRAS - EXCLUIR/EDITAR)
  // ==========================================
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 12,
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  editText: {
    color: '#3498db',
    fontWeight: 'bold',
    marginLeft: 4,
  }
});