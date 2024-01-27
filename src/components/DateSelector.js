import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme, Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import dateSelectorStyles from "./styles/dateSelectorStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();
  const styles = dateSelectorStyles();

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarModalVisible(!isCalendarModalVisible);
  };

  const handleDateChange = (newDate) => {
    if (newDate.dateString) {
      setSelectedDate(newDate.dateString);
    } else {
      const dateString = new Date(newDate).toISOString().split("T")[0];
      setSelectedDate(dateString);
    }
    setIsCalendarModalVisible(false);
    // You might also want to fetch food logs associated with the new date here
  };

  const subtractDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate.toISOString().split("T")[0]; // Format the date
  };

  const addDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate.toISOString().split("T")[0]; // Format the date
  };

  const getCurrentDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const selectedDateObj = new Date(date);
    const timeZoneOffset = selectedDateObj.getTimezoneOffset();
    selectedDateObj.setMinutes(selectedDateObj.getMinutes() + timeZoneOffset);
    return selectedDateObj.toLocaleDateString(undefined, options);
  };

  const getDateInfo = (date) => {
    if (typeof date === Date) {
      date = date.toISOString().split("T")[0];
    }

    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
    const currentDateStr = currentDate.toISOString().split("T")[0];

    if (date === currentDateStr) {
      return "Today";
    } else if (date === addDay(currentDate)) {
      return "Tomorrow";
    } else if (date === subtractDay(currentDate)) {
      return "Yesterday";
    } else {
      return " ";
    }
  };

  const handlePrevDay = () => {
    setSelectedDate(subtractDay(selectedDate));
  };

  const handleNextDay = () => {
    setSelectedDate(addDay(selectedDate));
  };

  return (
    <LinearGradient
      style={{
        height: "18%",
        justifyContent: "flex-end",
        paddingVertical: 10,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        borderColor: theme.colors.sectionBorderColor,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        elevation: 4,
      }}
      colors={[
        `${theme.colors.primary}99`, // Adding "99" for 0.99 opacity
        `${theme.colors.secondary}99`, // Adding "99" for 0.99 opacity
      ]}
      start={{ x: 0, y: 1.5 }} // Top left corner
      end={{ x: 1, y: 2 }} // Bottom right corner
    >
      <Card
        style={{
          ...styles.section,
          backgroundColor: "transparent",
        }}
      >
        <Card.Content style={{ paddingHorizontal: 15, paddingVertical: 0 }}>
          <View style={styles.headerDateContainer}>
            <TouchableOpacity
              style={{
                borderRadius: 30,
                padding: 10,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              onPress={() => {
                handlePrevDay();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Feather
                name="chevron-left"
                size={28}
                color={theme.colors.cardHeaderTextColor}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: 15,
                borderRadius: 16,
              }}
            >
              <TouchableOpacity onPress={handleCalendarToggle}>
                <View style={styles.calendarModalButton}>
                  <Feather
                    name="calendar"
                    size={24}
                    color={theme.colors.cardHeaderTextColor}
                  />
                  <Text style={styles.date}>
                    {getCurrentDate(selectedDate)}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.dateInfo}>{getDateInfo(selectedDate)}</Text>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 30,
                padding: 10,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              onPress={() => {
                handleNextDay();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Feather
                name="chevron-right"
                size={28}
                color={theme.colors.cardHeaderTextColor}
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.calendarModal}>
          <View style={styles.calendarWrapper}>
            <Calendar
              style={{
                height: "auto",
                width: "100%",
                backgroundColor: theme.colors.cardDarkGrayBackgroundColor,
              }}
              current={selectedDate.toString()}
              onDayPress={handleDateChange}
              hideExtraDays
              theme={{
                calendarBackground: theme.colors.cardBackgroundColor,
                selectedDayBackgroundColor: theme.colors.primary,
                selectedDayTextColor: theme.colors.cardHeaderTextColor,
                todayTextColor: theme.colors.cardHeaderTextColor,
                "stylesheet.calendar.header": {
                  monthText: {
                    color: theme.colors.cardHeaderTextColor,
                    fontSize: 25,
                  },
                  dayHeader: {
                    color: theme.colors.cardHeaderTextColor,
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  },
                },
              }}
              dayComponent={({ date, state }) => {
                const isCurrentDate = date.dateString === selectedDate;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleDateChange({ dateString: date.dateString })
                    }
                  >
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          state === "selected"
                            ? theme.colors.primary
                            : isCurrentDate
                            ? "#1abc9c"
                            : "transparent",
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        {date.day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View
              style={{
                flexDirection: "row",
                backgroundColor: theme.colors.cardDarkGrayBackgroundColor,
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={styles.cancelDateButton}
                onPress={() => setIsCalendarModalVisible(false)}
              >
                <Text style={styles.cancelDateButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelDateButton}
                onPress={() => setIsCalendarModalVisible(false)}
              >
                <Text style={styles.cancelDateButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
