import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons"; // eslint-disable-line
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState<IncidentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  async function loadIncidents() {
    if (loading) return;
    if (total > 0 && incidents.length === total) return;
    setLoading(true);
    const response = await api.get(`incidents`, {
      params: { page },
    });
    setIncidents((prevIncidents) => [...prevIncidents, ...response.data]);
    setTotal(response.headers[`x-total-count`]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident: IncidentType) {
    navigation.navigate(`Detail`, { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>
      <FlatList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.3}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>
            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat(`pt-BR`, {
                currency: `BRL`,
                style: `currency`,
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              onPress={() => navigateToDetail(incident)}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather color="#E02041" name="arrow-right" size={16} />
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.incidentList}
      />
    </View>
  );
}
