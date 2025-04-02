import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper'
import { useAuth } from '../hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../components/PageHeader';

export default function ProfileScreen() {

  const { logOut, user } = useAuth();
  const [error, setError] = useState("");

  const handleLogOut = async () => {
    try {
      logOut()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <SafeAreaView>
      <PageHeader title="Profile" description="Info here" />
      <Button mode="contained" onPress={handleLogOut}>
        Log Out
      </Button>
    </SafeAreaView>
  )
}
