<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Sale
 *
 * @ORM\Table(name="sale", uniqueConstraints={@ORM\UniqueConstraint(name="client_id_UNIQUE", columns={"client_id"}), @ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_sale_businesspartner1_idx", columns={"pax_id"}), @ORM\Index(name="fk_sale_airline1_idx", columns={"airline_id"}), @ORM\Index(name="fk_sale_Cards1_idx", columns={"cards_id"}), @ORM\Index(name="fk_sale_airport1_idx", columns={"airport_from"}), @ORM\Index(name="fk_sale_airport2_idx", columns={"airport_to"})})
 * @ORM\Entity
 */
class Sale
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="flight_locator", type="string", length=45, nullable=true)
     */
    private $flightLocator;

    /**
     * @var string
     *
     * @ORM\Column(name="checkin_state", type="string", length=20, nullable=true)
     */
    private $checkinState;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="issue_date", type="datetime", nullable=false)
     */
    private $issueDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="boarding_date", type="datetime", nullable=true)
     */
    private $boardingDate;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="return_date", type="datetime", nullable=true)
     */
    private $returnDate;

    /**
     * @var string
     *
     * @ORM\Column(name="miles_used", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $milesUsed = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="tax", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $tax = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="amount_paid", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $amountPaid = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="total_cost", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $totalCost = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="kickback", type="decimal", precision=20, scale=0, nullable=false)
     */
    private $kickback = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=2000, nullable=true)
     */
    private $description;

    /**
     * @var integer
     *
     * @ORM\Column(name="cards_id", type="integer", nullable=true)
     */
    private $cardsId;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=20, nullable=true)
     */
    private $status;

    /**
     * @var \Airline
     *
     * @ORM\ManyToOne(targetEntity="Airline")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="airline_id", referencedColumnName="id")
     * })
     */
    private $airline;

    /**
     * @var \Airport
     *
     * @ORM\ManyToOne(targetEntity="Airport")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="airport_from", referencedColumnName="id")
     * })
     */
    private $airportFrom;

    /**
     * @var \Airport
     *
     * @ORM\ManyToOne(targetEntity="Airport")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="airport_to", referencedColumnName="id")
     * })
     */
    private $airportTo;

    /**
     * @var \Businesspartner
     *
     * @ORM\ManyToOne(targetEntity="Businesspartner")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pax_id", referencedColumnName="id")
     * })
     */
    private $pax;

    /**
     * @var \Businesspartner
     *
     * @ORM\ManyToOne(targetEntity="Businesspartner")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="client_id", referencedColumnName="id")
     * })
     */
    private $client;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set flightLocator
     *
     * @param string $flightLocator
     * @return Sale
     */
    public function setFlightLocator($flightLocator)
    {
        $this->flightLocator = $flightLocator;
    
        return $this;
    }

    /**
     * Get flightLocator
     *
     * @return string 
     */
    public function getFlightLocator()
    {
        return $this->flightLocator;
    }

    /**
     * Set checkinState
     *
     * @param string $checkinState
     * @return Sale
     */
    public function setCheckinState($checkinState)
    {
        $this->checkinState = $checkinState;
    
        return $this;
    }

    /**
     * Get checkinState
     *
     * @return string 
     */
    public function getCheckinState()
    {
        return $this->checkinState;
    }

    /**
     * Set issueDate
     *
     * @param \DateTime $issueDate
     * @return Sale
     */
    public function setIssueDate($issueDate)
    {
        $this->issueDate = $issueDate;
    
        return $this;
    }

    /**
     * Get issueDate
     *
     * @return \DateTime 
     */
    public function getIssueDate()
    {
        return $this->issueDate;
    }

    /**
     * Set boardingDate
     *
     * @param \DateTime $boardingDate
     * @return Sale
     */
    public function setBoardingDate($boardingDate)
    {
        $this->boardingDate = $boardingDate;
    
        return $this;
    }

    /**
     * Get boardingDate
     *
     * @return \DateTime 
     */
    public function getBoardingDate()
    {
        return $this->boardingDate;
    }

    /**
     * Set returnDate
     *
     * @param \DateTime $returnDate
     * @return Sale
     */
    public function setReturnDate($returnDate)
    {
        $this->returnDate = $returnDate;
    
        return $this;
    }

    /**
     * Get returnDate
     *
     * @return \DateTime 
     */
    public function getReturnDate()
    {
        return $this->returnDate;
    }

    /**
     * Set milesUsed
     *
     * @param string $milesUsed
     * @return Sale
     */
    public function setMilesUsed($milesUsed)
    {
        $this->milesUsed = $milesUsed;
    
        return $this;
    }

    /**
     * Get milesUsed
     *
     * @return string 
     */
    public function getMilesUsed()
    {
        return $this->milesUsed;
    }

    /**
     * Set tax
     *
     * @param string $tax
     * @return Sale
     */
    public function setTax($tax)
    {
        $this->tax = $tax;
    
        return $this;
    }

    /**
     * Get tax
     *
     * @return string 
     */
    public function getTax()
    {
        return $this->tax;
    }

    /**
     * Set amountPaid
     *
     * @param string $amountPaid
     * @return Sale
     */
    public function setAmountPaid($amountPaid)
    {
        $this->amountPaid = $amountPaid;
    
        return $this;
    }

    /**
     * Get amountPaid
     *
     * @return string 
     */
    public function getAmountPaid()
    {
        return $this->amountPaid;
    }

    /**
     * Set totalCost
     *
     * @param string $totalCost
     * @return Sale
     */
    public function setTotalCost($totalCost)
    {
        $this->totalCost = $totalCost;
    
        return $this;
    }

    /**
     * Get totalCost
     *
     * @return string 
     */
    public function getTotalCost()
    {
        return $this->totalCost;
    }

    /**
     * Set kickback
     *
     * @param string $kickback
     * @return Sale
     */
    public function setKickback($kickback)
    {
        $this->kickback = $kickback;
    
        return $this;
    }

    /**
     * Get kickback
     *
     * @return string 
     */
    public function getKickback()
    {
        return $this->kickback;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Sale
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set cardsId
     *
     * @param integer $cardsId
     * @return Sale
     */
    public function setCardsId($cardsId)
    {
        $this->cardsId = $cardsId;
    
        return $this;
    }

    /**
     * Get cardsId
     *
     * @return integer 
     */
    public function getCardsId()
    {
        return $this->cardsId;
    }

    /**
     * Set status
     *
     * @param string $status
     * @return Sale
     */
    public function setStatus($status)
    {
        $this->status = $status;
    
        return $this;
    }

    /**
     * Get status
     *
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set airline
     *
     * @param \Airline $airline
     * @return Sale
     */
    public function setAirline(\Airline $airline = null)
    {
        $this->airline = $airline;
    
        return $this;
    }

    /**
     * Get airline
     *
     * @return \Airline 
     */
    public function getAirline()
    {
        return $this->airline;
    }

    /**
     * Set airportFrom
     *
     * @param \Airport $airportFrom
     * @return Sale
     */
    public function setAirportFrom(\Airport $airportFrom = null)
    {
        $this->airportFrom = $airportFrom;
    
        return $this;
    }

    /**
     * Get airportFrom
     *
     * @return \Airport 
     */
    public function getAirportFrom()
    {
        return $this->airportFrom;
    }

    /**
     * Set airportTo
     *
     * @param \Airport $airportTo
     * @return Sale
     */
    public function setAirportTo(\Airport $airportTo = null)
    {
        $this->airportTo = $airportTo;
    
        return $this;
    }

    /**
     * Get airportTo
     *
     * @return \Airport 
     */
    public function getAirportTo()
    {
        return $this->airportTo;
    }

    /**
     * Set pax
     *
     * @param \Businesspartner $pax
     * @return Sale
     */
    public function setPax(\Businesspartner $pax = null)
    {
        $this->pax = $pax;
    
        return $this;
    }

    /**
     * Get pax
     *
     * @return \Businesspartner 
     */
    public function getPax()
    {
        return $this->pax;
    }

    /**
     * Set client
     *
     * @param \Businesspartner $client
     * @return Sale
     */
    public function setClient(\Businesspartner $client = null)
    {
        $this->client = $client;
    
        return $this;
    }

    /**
     * Get client
     *
     * @return \Businesspartner 
     */
    public function getClient()
    {
        return $this->client;
    }
    /**
     * @var \Cards
     *
     * @ORM\ManyToOne(targetEntity="Cards")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="cards_id", referencedColumnName="id")
     * })
     */
    private $cards;


    /**
     * Set cards
     *
     * @param \Cards $cards
     * @return Sale
     */
    public function setCards(\Cards $cards = null)
    {
        $this->cards = $cards;
    
        return $this;
    }

    /**
     * Get cards
     *
     * @return \Cards 
     */
    public function getCards()
    {
        return $this->cards;
    }
    /**
     * @var string
     *
     * @ORM\Column(name="flight", type="string", length=45, nullable=true)
     */
    private $flight;

    /**
     * @var string
     *
     * @ORM\Column(name="flight_hour", type="string", length=45, nullable=true)
     */
    private $flightHour;


    /**
     * Set flight
     *
     * @param string $flight
     * @return Sale
     */
    public function setFlight($flight)
    {
        $this->flight = $flight;
    
        return $this;
    }

    /**
     * Get flight
     *
     * @return string 
     */
    public function getFlight()
    {
        return $this->flight;
    }

    /**
     * Set flightHour
     *
     * @param string $flightHour
     * @return Sale
     */
    public function setFlightHour($flightHour)
    {
        $this->flightHour = $flightHour;
    
        return $this;
    }

    /**
     * Get flightHour
     *
     * @return string 
     */
    public function getFlightHour()
    {
        return $this->flightHour;
    }
}
