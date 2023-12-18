import { MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  Box,
  Button,
  Flex,
  Image,
  Pill,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import {
  IoCalendarClearOutline,
  IoGameController,
  IoLocationSharp,
  IoTv,
} from 'react-icons/io5';
import './Event.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchEvent } from '../../store/reducers/event';
import Date from '../../components/Date/Date';
import { registerToEvent } from '../../store/reducers/registerEvent';
import { unregisterToEvent } from '../../store/reducers/unregisterEvent';

function Event() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  if (!slug) throw new Error('Invalid slug');
  const eventData = useAppSelector((state) => state.event.event);
  const userData = useAppSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchEvent(slug));
  }, [dispatch, slug]);

  const isRegisterToEvent = () => {
    const participantFound = eventData.participants.map(
      (participant) => participant.id
    );
    return participantFound.includes(userData.id);
  };

  const sanitizedEventRules = DOMPurify.sanitize(eventData.rules);

  const handleEventRegister = () => {
    dispatch(
      registerToEvent({
        event_id: eventData.id,
        user_id: userData.id,
      })
    );
    console.log('inscrit');
    navigate(0);
  };

  const handleEventUnregister = () => {
    dispatch(
      unregisterToEvent({
        event_id: eventData.id,
        user_id: userData.id,
      })
    );
    console.log('désinscrit');
    navigate(0);
  };

  return (
    <>
      <Image
        src={eventData.banner}
        className="event__banner full-height full-width"
      />
      <div className="event__header full-width content-grid">
        <div className="event__header-content">
          <Box className="event__image">
            <Image
              src={eventData.thumbnail}
              h={200}
              w={200}
              radius="sm"
              fit="cover"
            />
          </Box>
          <div className="event__infos">
            <Box className="event_infos--presentation">
              <Flex gap="sm">
                <Pill>{eventData.status}</Pill>

                {eventData.type_event && (
                  <Pill>{eventData.type_event.name}</Pill>
                )}
              </Flex>
              <Title order={1}>{eventData.title}</Title>
              <Text size="md">
                <Flex align="center" gap="sm">
                  <IoCalendarClearOutline />
                  <Date
                    startDate={eventData.start_date}
                    endDate={eventData.end_date}
                  />
                </Flex>
              </Text>
            </Box>

            <Flex gap="xl" className="event__infos-details">
              <Text>
                <IoGameController color="var(--mantine-color-blue-filled)" />
                {eventData.game.name}
              </Text>
              <Text>
                <IoLocationSharp color="var(--mantine-color-blue-filled)" />
                {eventData.location}
              </Text>
              <Text>
                <IoTv color="var(--mantine-color-blue-filled)" />
                PC
              </Text>
            </Flex>
          </div>

          <Stack className="event__buttons">
            <Button
              className="event__buttons--follow"
              variant="outline"
              component="a"
              href={`/event/${eventData.title_slug}/settings`}
            >
              Editer
            </Button>
            <Button className="event__buttons--follow">Suivre</Button>
            <Button className="event__buttons--contact">
              {eventData.contact}
            </Button>

            {isRegisterToEvent() ? (
              <Button
                className="event__buttons--register"
                onClick={handleEventUnregister}
              >
                Se désinscrire
              </Button>
            ) : (
              <Button
                className="event__buttons--register"
                onClick={handleEventRegister}
              >
                S&apos;inscrire
              </Button>
            )}
          </Stack>
        </div>
      </div>

      <Box>
        {eventData.participants.map((user) => (
          <p key={user.id}>{user.username}</p>
        ))}
      </Box>

      <TypographyStylesProvider>
        <Box
          className="event__content"
          dangerouslySetInnerHTML={{ __html: sanitizedEventRules }}
        />
      </TypographyStylesProvider>
    </>
  );
}

export default Event;
