import React, { useLayoutEffect, useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { CouponsFormProps } from '../../navigation/types';
import { useCouponsStore } from '../../store/useCouponsStore';
import { colors } from '../../theme';

export function CouponsForm({ navigation, route }: CouponsFormProps) {
  const couponId = route.params?.couponId;
  const isEditing = Boolean(couponId);

  const existing = useCouponsStore((state) =>
    couponId
      ? state.coupons.find((coupon) => coupon.id === couponId)
      : undefined,
  );

  const addCoupon = useCouponsStore((state) => state.addCoupon);
  const updateCoupon = useCouponsStore((state) => state.updateCoupon);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [titleError, setTitleError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar cupom' : 'Novo cupom',
    });
  }, [navigation, isEditing]);

  const handleSave = () => {
    if (title.trim() === '') {
      setTitleError('Título é obrigatório');
      return;
    }

    const input = { title, description };

    if (isEditing && couponId) {
      updateCoupon(couponId, input);
    } else {
      addCoupon(input);
    }

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Título *</Text>
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (titleError) {
              setTitleError(null);
            }
          }}
          placeholder="Digite o título"
          placeholderTextColor="#888"
          style={styles.input}
        />
        {titleError ? <Text style={styles.error}>{titleError}</Text> : null}

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Digite a descrição (opcional)"
          placeholderTextColor="#888"
          multiline
          style={[styles.input, styles.inputMultiline]}
        />

        <View style={styles.actions}>
          <Button title="Salvar" onPress={handleSave} color={colors.accent} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  content: {
    padding: 16,
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: colors.textPrimary,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  error: {
    color: '#ff5252',
    marginTop: 4,
  },
  actions: {
    marginTop: 24,
  },
});
