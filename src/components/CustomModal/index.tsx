import React, { useCallback } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  ModalProps,
  View,
  TouchableOpacity,
} from 'react-native';
import TemplateText, { TemplateTextProps } from 'components/TemplateText';
import { mixinStyles } from 'assets/styles/mixin';

interface CustomModalProps extends ModalProps {
  contentRenderer: () => React.ReactNode;
  setVisible: (visible: boolean) => void;
  title?: string;
  titleProps?: TemplateTextProps;
  confirmText?: string;
  cancelText?: string;
  confirmPress?: () => void;
}

const CustomModal = (props: CustomModalProps) => {
  const {
    title,
    titleProps,
    contentRenderer,
    confirmPress,
    confirmText,
    cancelText,
  } = props;

  const _closeModal = useCallback(() => props.setVisible(false), [props]);
  const _confirmPress = useCallback(() => {
    confirmPress && confirmPress();
    props.setVisible(false);
  }, [confirmPress, props])

  const _visible = props?.visible || false;

  if (!_visible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={_visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
      {...props}>
      <Pressable style={styles.centeredView} onPress={_closeModal}>
        <Pressable style={styles.modalView}>
          {title && (
            <TemplateText style={styles.titleText} {...titleProps}>
              {title}
            </TemplateText>
          )}
          {contentRenderer()}
          {(confirmText || cancelText) && (
            <View style={styles.buttonWrap}>
              {cancelText && (
                <TouchableOpacity
                  onPress={_closeModal}
                  style={styles.cancelButton}>
                  <TemplateText familyType="power" style={styles.buttonText}>
                    {cancelText || '취소'}
                  </TemplateText>
                </TouchableOpacity>
              )}
              {confirmText && (
                <TouchableOpacity
                  onPress={_confirmPress}
                  style={styles.confirmButton}>
                  <TemplateText familyType="power" style={styles.buttonText}>
                    {confirmText || '확인'}
                  </TemplateText>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    ...mixinStyles.flexCenter,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    borderRadius: 10,
    borderBottomWidth: 1,
    marginHorizontal: 25,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {},
  contentText: {},
  buttonWrap: {
    flexDirection: 'row',
    height: 48,
  },
  cancelButton: {
    ...mixinStyles.flexCenter,
    flex: 1,
    borderBottomStartRadius: 10,
    backgroundColor: '#D3D3D3',
  },
  confirmButton: {
    ...mixinStyles.flexCenter,
    flex: 1,
    borderBottomEndRadius: 10,
    backgroundColor: '#E5CC6D',
  },
  buttonText: { color: '#fff' },
});

export default CustomModal;
